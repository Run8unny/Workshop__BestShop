import { execa } from 'execa';
import { existsSync } from 'fs'

(async () => {
    try {
        await execa("git", ["checkout", "--orphan", "gh-pages"]);
        // eslint-disable-next-line no-console

        console.log("Building started...");
        await execa("npm", ["run", "build"]);

        const folderName = existsSync("dist") ? "dist" : "build";
        await execa("git", ["--work-tree", folderName, "add", "--all"]);
        await execa("git", ["--work-tree", folderName, "commit", "-m", "gh-pages"]);

        console.log("Pushing to gh-pages...");
        await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
        await execa("rm", ["-r", folderName]);
        await execa("git", ["checkout", "-f", "main"]);
        await execa("git", ["branch", "-D", "gh-pages"]);

        console.log("Successfully deployed, check your repo");
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e.message);
        process.exit(1);
    }
})();
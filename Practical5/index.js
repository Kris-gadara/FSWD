const fs = require("fs");
const path = require("path");
const readline = require("readline-sync");

const fileTypes = {
    Images: [".jpg", ".jpeg", ".png", ".gif"],
    Documents: [".pdf", ".docx", ".txt", ".xlsx"],
    Videos: [".mp4", ".mkv", ".avi"],
};

function organizeFiles(directory) {
    if (!fs.existsSync(directory)) {
        console.log("Directory does not exist!");
        return;
    }

    const files = fs.readdirSync(directory);
    if (files.length === 0) {
        console.log("No files to organize.");
        return;
    }

    const summary = [];

    files.forEach((file) => {
        const filePath = path.join(directory, file);
        if (fs.lstatSync(filePath).isFile()) {
            const ext = path.extname(file).toLowerCase();
            let folder = "Others";

            for (const [key, extensions] of Object.entries(fileTypes)) {
                if (extensions.includes(ext)) {
                    folder = key;
                    break;
                }
            }

            const folderPath = path.join(directory, folder);
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
            }

            const newFilePath = path.join(folderPath, file);
            fs.renameSync(filePath, newFilePath);
            summary.push(`Moved ${file} to ${folder}`);
        }
    });

    fs.writeFileSync(path.join(directory, "summary.txt"), summary.join("\n"));
    console.log("Files organized successfully! Check summary.txt for details.");
}

const dirPath = readline.question("Enter directory path to organize: ");
organizeFiles(C:\Users\LENOVO GAMING\Downloads);

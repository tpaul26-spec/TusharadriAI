# p2p-chat

Simple WebSocket (Socket.IO) chat server and static client.

Files:
- `server.js` — Express + socket.io server (serves `public/`).
- `public/` — static client files (HTML/JS).

Quick start

1. Install dependencies:

```powershell
npm install
```

2. Start the server:

```powershell
# If package.json has a start script
npm start
# or directly
node server.js
```

3. Open the client at http://localhost:10000 (or the port shown in console).

Notes

- `server.js` uses ES module `import` syntax — ensure `package.json` contains `"type": "module"` or run with a setup that supports ES modules.
- To push the repo to GitHub, see the steps at the bottom of this README or use the automated `gh` CLI command shown below.

Push to GitHub (examples)

Using GitHub CLI (if installed and authenticated):

```powershell
gh repo create p2p-chat --public --source=. --remote=origin --push --confirm
```

Manual flow (if not using `gh`):

1. Create an empty repository on GitHub (via web UI).
2. Add remote and push:

```powershell
git remote add origin https://github.com/<your-username>/p2p-chat.git
git push -u origin main
```

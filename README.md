# David Bradshaw's Personal Website

This is the FE for my personal website and portfolio.

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Deploy

Run `npm run deploy`.  This will build and FTP the items into the hosting.  You will need to install `lftp` (`brew install lftp`).  And there should be a file called `deploy.sh` which is saved in root (not committed).  Content of file shoudl be: 

```bash
#!/bin/sh
FTP_USER="VARIABLE"
FTP_PASSWORD="VARIABLE"
lftp -e 'set ftp:ssl-allow no; mirror -R /dist /' -u $FTP_USER,$FTP_PASSWORD davidbradshaw.us
```

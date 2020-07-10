### Setup of https://explorer.bitcoin-global.io on Ubuntu 16.04

    apt update
    apt upgrade
    apt install git python-software-properties software-properties-common nginx gcc g++ make
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
    nvm install 10.14.1 ## LTS release of NodeJS as of 2018-11-29, via https://nodejs.org/en/
    npm install pm2 --global
    add-apt-repository ppa:certbot/certbot
    apt update
    apt upgrade
    apt install python-certbot-nginx
    
Copy content from [./explorer.bitcoin-global.io.conf](./explorer.bitcoin-global.io.conf) into `/etc/nginx/sites-available/explorer.bitcoin-global.io.conf`

    certbot --nginx -d explorer.bitcoin-global.io
    cd /etc/ssl/certs
    openssl dhparam -out dhparam.pem 4096
    cd /home/bitcoin
    git clone https://github.com/bitcoin-global/explorer.git
    cd /home/bitcoin-global/bitcoin-global-global-explorer
    npm install
    npm run build
    pm2 start bin/www --name "btg-rpc-explorer"

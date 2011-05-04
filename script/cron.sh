#!/bin/sh
# eriji.com cron trigger script
# 
# Usage:
# 
# On linux:
# > crontab -e
# --------------------------------------------------------
# 3 * * * * /path/to/erijiProject/script/cron.sh
# --------------------------------------------------------
# or just use cUrl :
# --------------------------------------------------------
# 3 * * * * curl http://www.eriji.com/admin/cron
# --------------------------------------------------------

url="http://yiriji.com/admin/cron";
curl $url;
echo " task(s)";

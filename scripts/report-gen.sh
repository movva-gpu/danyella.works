#!/bin/sh

directory="/var/www/home/public/private/reports"

timestamp=$(date +"%d-%m-%Y_%H-%M-%S")

goaccess /var/log/apache2/pers.log --log-format=combined -a -o "$directory/report-$timestamp.html"

if [ -f "$directory/latest.html" ]; then
    rm "$directory/latest.html"
fi

ln -s "report-$timestamp.html" "$directory/latest.html"


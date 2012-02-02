#!/usr/bin/env sh

## OPTIONS
# -p, --no-ping    Don't ping Google, Bing and Pingomatic
# -g, --no-github  Don't redownload assets, versions, and resources from GitHub
# -r, --only-root  Only upload the root domain, thomasjbradley.ca

PING=1
GITHUB=1
ROOTONLY=0

# http://stackoverflow.com/questions/402377/using-getopts-in-bash-shell-script-to-get-long-and-short-command-line-options/7680682#7680682
optspec=":pgr-:"

while getopts "$optspec" optchar ; do
  case "${optchar}" in
    -)
      case "${OPTARG}" in
        no-ping)
          PING=0
          ;;
        no-github)
          GITHUB=0
          ;;
        only-root)
          ROOTONLY=1
          ;;
      esac;;
    p)
      PING=0
      ;;
    g)
      GITHUB=0
      ;;
    r)
      ROOTONLY=1
      ;;
  esac
done

if [ "$GITHUB" -gt 0 ] ; then
  ./_build/update-github-assets.sh
fi

# Recreate site with remote subdomains
mv ./_env ./_env.bak
jekyll ./__remote
mv ./_env.bak ./_env

./_build/hash-static-assets.sh
./_build/compress-html.sh

if [ "$ROOTONLY" -lt 1 ] ; then
  rsync -e ssh -a --delete --progress --compress --chmod=u=rwx,go=rx --exclude-from './_build/exclude-base.txt' ./__remote/img/ thomasjbradley:/home/thomasj/images
  rsync -e ssh -a --delete --progress --compress --chmod=u=rwx,go=rx --exclude-from './_build/exclude-base.txt' ./__remote/img2/ thomasjbradley:/home/thomasj/images2
  rsync -e ssh -a --delete --progress --compress --chmod=u=rwx,go=rx --exclude-from './_build/exclude-base.txt' ./__remote/static/ thomasjbradley:/home/thomasj/static
fi

rsync -e ssh -a --delete --progress --compress --chmod=u=rwx,go=rx --exclude-from './_build/exclude-root.txt' ./__remote/ thomasjbradley:/home/thomasj/public_html

if [ "$PING" -gt 0 ] ; then
  curl http://www.google.com/webmasters/tools/ping?sitemap=http://thomasjbradley.ca/sitemap.xml
  curl http://www.bing.com/webmaster/ping.aspx?siteMap=http://thomasjbradley.ca/sitemap.xml

  curl -X POST -d @_build/pingomatic.xml --header "Content-Type: text/xml" http://rpc.pingomatic.com
fi

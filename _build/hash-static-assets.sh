#! /bin/bash

# Finds all the static assets that include a build number
# and replaces the build number with an MD5 hash
# Searches and replaces all HTML files for the newly named static assets

FILES=`find ./__remote/static -regex '.*/*.[0-9]\{10\}.min.*'`
COMMANDS=''
TEMPFILE="/tmp/$(basename $0).$$.tmp"

for F in $FILES; do
	HASH=`md5 -q ${F}`
	FNAME=`echo ${F} | cut -d'/' -f 4`
	NEWFNAME=`echo ${FNAME} | sed -e "s/[0-9]\{10\}/${HASH}/g"`
	NEWF=`echo ${F} | sed -e "s/[0-9]\{10\}/${HASH}/g"`
	COMMAND="s/${FNAME}/${NEWFNAME}/g"
	COMMANDS="${COMMANDS}${COMMAND}\n"

	mv $F $NEWF
done

echo -e $COMMANDS >> $TEMPFILE

find ./__remote -name "*.html" -type f -print0 | xargs -0 sed -i '' -f $TEMPFILE

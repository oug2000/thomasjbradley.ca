#!/usr/bin/env bash

# Update the assets used in the online examples
wget -O static/signature-pad/jquery.signaturepad.min.js https://raw.github.com/thomasjbradley/signature-pad/master/build/jquery.signaturepad.min.js
wget -O static/signature-pad/jquery.signaturepad.css https://raw.github.com/thomasjbradley/signature-pad/master/build/jquery.signaturepad.css
wget -O static/signature-pad/flashcanvas.js https://raw.github.com/thomasjbradley/signature-pad/master/build/flashcanvas.js
wget -O static/signature-pad/json2.min.js https://raw.github.com/thomasjbradley/signature-pad/master/build/json2.min.js
wget -O static/signature-pad/sample-signature-output.js https://raw.github.com/thomasjbradley/signature-pad/master/examples/sample-signature-output.js
wget -O static/signature-pad/flashcanvas.swf https://raw.github.com/thomasjbradley/signature-pad/master/build/flashcanvas.swf
wget -O static/signature-pad/pen.cur https://raw.github.com/thomasjbradley/signature-pad/master/build/pen.cur
wget -O static/signature-pad/journal.eot https://raw.github.com/thomasjbradley/signature-pad/master/build/journal.eot
wget -O static/signature-pad/journal.svg https://raw.github.com/thomasjbradley/signature-pad/master/build/journal.svg
wget -O static/signature-pad/journal.ttf https://raw.github.com/thomasjbradley/signature-pad/master/build/journal.ttf
wget -O static/signature-pad/journal.woff https://raw.github.com/thomasjbradley/signature-pad/master/build/journal.woff

# Update the version numbers
wget -O _includes/sigpad/VERSION.txt https://raw.github.com/thomasjbradley/signature-pad/master/VERSION.txt
wget -O _includes/sigimg/VERSION.txt https://raw.github.com/thomasjbradley/signature-to-image/master/VERSION.txt

var sig = [{lx:20,ly:34,mx:20,my:34},{lx:21,ly:33,mx:20,my:34},…];

$(document).ready(function () {
  $('.sigPad').signaturePad({displayOnly:true}).regenerate(sig);
});

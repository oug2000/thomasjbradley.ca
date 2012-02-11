<script>
  $(document).ready(function () {
    // Write out the complete signature from the database to Javascript
    var sig = <?php echo $output; ?>;
    $('.sigPad').signaturePad({displayOnly : true}).regenerate(sig);
  });
</script>

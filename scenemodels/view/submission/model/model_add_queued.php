<?php

$pageTitle = "Models addition form";
include 'view/header.php';
?>

<p class="center">Your model named "<?=$updatedReq->getNewModel()->getMetadata()->getFilename()?>" has been successfully queued 
into the FG scenery database insertion requests!<br />
Unless it's rejected, it should appear in Terrasync within a few days.<br />
The FG community would like to thank you for your contribution!<br />
Want to submit another model or position?<br /> <a href="/submission/">Click here to go back to the submission page.</a></p>
    
<?php
require 'view/footer.php';

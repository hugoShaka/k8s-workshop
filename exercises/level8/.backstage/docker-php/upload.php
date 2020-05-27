<?php
  if(!empty($_FILES['uploaded_file']))
  {
    $path = 'uploads/' . basename( $_FILES['uploaded_file']['name']);

    if(!move_uploaded_file($_FILES['uploaded_file']['tmp_name'], $path)) {
        echo "There was an error uploading the file, please try again!";
    }
  }
?>
<!DOCTYPE html>
<html>
<head>
  <title>Upload your files</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>
<div class="container well">
    <form enctype="multipart/form-data" action="/" method="POST" class="form-inline">
        <h3>Upload your file</h3>
        <input type="file" class="form-control-file mb-2" name="uploaded_file"></input>
        <button type="submit" class="btn btn-primary mb-2">Submit</button>
    </form>
    <br>
    <div class="gallery">
        <h3>File uploaded:</h3>
        <ul class="list-group">
        <?php
          $files = array_diff(scandir('./uploads'), array('.', '..'));
          if($files != false) {
            foreach($files as $file) {
              echo '<li class="list-group-item"><a href="/uploads/' . $file . '">' . $file . '<a></li>';
            }
          }
        ?>
        </ul>
    </div>
</div>
</body>
</html>
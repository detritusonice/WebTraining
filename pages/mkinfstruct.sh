if [ "$1" != "" ]; then
	if [ -e $1 ]; then
		echo "$1 exists."
	else
		mkdir $1 $1/css $1/js   	#creating the directory structure
		touch $1/css/$1.css $1/js/$1.js #empty css and javascript files

# a  here document redirected to a file, creating the basic html file structure
# to indicate indentation in the html file, this block has been places flush left
		(
		cat <<_EOF_
<!DOCTYPE html>
<html lang="en-US">
	<head>
		<title>$1</title>
		<meta charset="UTF-8">
		<link rel="stylesheet" href="css/$1.css">
	</head>
	<script type="application/javascript" src="js/$1.js"></script>
	<body onload="init()">
	
	</body>
</html>
_EOF_
) > $1/$1.html
#------------------------------------------------------------
	fi
else
	echo "Usage: $0 pagefoldername"
	exit $E_BADARGS
fi


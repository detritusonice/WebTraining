if [ "$1" != "" ]; then
	if [ -e $1 ]; then
		echo "$1 exists."
	else
		mkdir $1 $1/css $1/js
		touch $1/$1.html $1/css/$1.css $1/js/$1.js
	fi
else
	echo "name of page structure to create not given."
fi


#!/bin/bash
currentDir=$PWD
clientRepo=../../MT-SK-II-PITERADAY-COM

#Step 1 Build code
#yarn build

#Step 2 clean client repo
cd $clientRepo

files=( "asset-manifest.json" "favicon-32x32.png" "favicon.ico" "index.html" "manifest.json" "robots.txt" )
directories=( "static" "video" )

# check that the first entry in that array actually exists
#[[ -e $files || -L $files ]] || {
#  echo "No files containing $1 found; exiting" >&2
#}

###########################
########## FILES ##########
###########################
echo "This script will delete the following files:" >&2
printf '  %q\n' "${files[@]}" >&2

valid=0
while (( ! valid )); do
  read -p "Do you want to proceed? (y/n): "
  case $REPLY in
    y) valid=1; echo "...Deleting; please wait" >&2; rm -f "${files[@]}" ;;
    n) valid=1 ;;
  esac
done


#############################
########## FOLDERS ##########
#############################
echo "This script will delete the content of the following folders:" >&2
printf '  %q\n' "${directories[@]}" >&2

valid=0
while (( ! valid )); do
  read -p "Do you want to proceed? (y/n): "
  case $REPLY in
    y) valid=1;
    for directory in "${directories[@]}"
	do
		rm -rf $directory/*
	done ;;
    n) valid=1 ;;
  esac
done

##########################
########## COPY ##########
##########################
echo "This script will copy the content of build in client folder:" >&2

valid=0
while (( ! valid )); do
  read -p "Do you want to proceed? (y/n): "
  case $REPLY in
    y) valid=1; cp -a "${currentDir}/build/." . ;;
    n) valid=1 ;;
  esac
done

cd $currentDir

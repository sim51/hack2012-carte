#!/bin/bash

# Prepare elasticsearch
curl -XPUT 'http://localhost:9200/hack2012/'
curl -XPUT 'http://localhost:9200/hack2012/place/_mapping' -d '
{
   "spectacle":{
      "properties":{
         "pin":{
            "type":"geo_point",
            "store":"yes"
         }
      }
   }
}' 

echo "*************************************************************************************"
echo "Importing SALLE SPECTACLE"
echo "*************************************************************************************"
INPUT=salle_spectacle.csv
OLDIFS=$IFS
IFS=';'
[ ! -f $INPUT ] && { echo "$INPUT file not found"; exit 99; }
while read colA colB colC colD colE colF colG colH colI colJ colK
do
	GEO=${colK/[/\"lat\":}
	GEO=${GEO/]/}
	GEO=${GEO/,/\, \"lon\":}
	curl -XPOST 'http://localhost:9200/hack2012/place' -d '{ 
      "name":"'$colB'", 
      "type":"Spectacle",
      "adress":"'$colC'", 
      "cp":"'$colD'", 
      "city":"'$colE'", 
      "mail":"'$colG'", 
      "site":"",
      "tel":"'$colH'", 
      "theme":"Tourisme", 
      "gestionnaire" : "Loire Atlantique", 
      "description" : "'$colI'",
      "pin":{'$GEO'}
   }'
	echo ""
done < $INPUT
IFS=$OLDIFS

echo "*************************************************************************************"
echo "Importing CAVE"
echo "*************************************************************************************"
INPUT=caves.csv
OLDIFS=$IFS
IFS=';'
[ ! -f $INPUT ] && { echo "$INPUT file not found"; exit 99; }
#while read colA colB colC colD colE colF colG colH colI colJ colK colM colN colO colP colQ colR colS colT colU colV colW colX colY colZ colAA colAB colAC colAD colAE colAF colAG colAH
while read colA colB colC colD colE colF colG colH colI colJ colK
do
   GEO=${colK/[/\"lat\":}
   GEO=${GEO/]/}
   GEO=${GEO/,/\, \"lon\":}
   curl -XPOST 'http://localhost:9200/hack2012/place' -d '{ 
      "name":"'$colB'", 
      "type":"Cave",
      "adress":"'$colC'", 
      "cp":"'$colD'", 
      "city":"'$colE'", 
      "mail":"'$colH'", 
      "site":"'$colI'",
      "tel":"'$colF'", 
      "theme":"Tourisme", 
      "gestionnaire" : "Loire Atlantique", 
      "description" : "'$colJ'",
      "pin":{'$GEO'}
   }'
   echo ""
done < $INPUT
IFS=$OLDIFS

echo "*************************************************************************************"
echo "Importing MONUMENT"
echo "*************************************************************************************"
INPUT=monuments.csv
OLDIFS=$IFS
IFS=';'
[ ! -f $INPUT ] && { echo "$INPUT file not found"; exit 99; }
while read colA colB colC colD colE colF colG colH colI colJ colK colL colM colN colO colP colQ colR colS colT colU
do
   GEO=${colU/[/\"lat\":}
   GEO=${GEO/]/}
   GEO=${GEO/,/\, \"lon\":}
   curl -XPOST 'http://localhost:9200/hack2012/place' -d '{ 
      "name":"'$colB'", 
      "type":"Monument",
      "adress":"'$colC'", 
      "cp":"'$colE'", 
      "city":"'$colF'", 
      "mail":"'$colI'", 
      "site":"'$colJ'",
      "tel":"'$colH'", 
      "theme":"Tourisme", 
      "gestionnaire" : "Loire Atlantique", 
      "description" : "'$colK'<br/>'$colT'<br/>'$colL'",
      "pin":{'$GEO'}
   }'
   echo ""
done < $INPUT
IFS=$OLDIFS


echo "*************************************************************************************"
echo "Importing RESTAURANT"
echo "*************************************************************************************"
INPUT=restaurants.csv
OLDIFS=$IFS
IFS=';'
[ ! -f $INPUT ] && { echo "$INPUT file not found"; exit 99; }
while read colA colB colC colD colE colF colG colH colI colJ colK colL colM colN colO colP colQ colR colS colT colU colV colW colX colY colZ colAA colAB colAC colAD colAE colAF colAG
do
   GEO=${colAG/[/\"lat\":}
   GEO=${GEO/]/}
   GEO=${GEO/,/\, \"lon\":}
   curl -XPOST 'http://localhost:9200/hack2012/place' -d '{ 
      "name":"'$colB'", 
      "type" : "Restaurant",
      "adress":"'$colC'", 
      "cp":"'$colE'", 
      "city":"'$colF'", 
      "mail":"'$colK'", 
      "site":"'$colL'",
      "tel":"'$colH'", 
      "theme":"Tourisme", 
      "gestionnaire" : "Loire Atlantique", 
      "description" : "'$colAE'<br/>'$colU'/'$colW'",
      "pin":{'$GEO'}
   }'
   echo ""
done < $INPUT
IFS=$OLDIFS

echo "*************************************************************************************"
echo "Importing HOTEL"
echo "*************************************************************************************"
INPUT=hotels.csv
OLDIFS=$IFS
IFS=';'
[ ! -f $INPUT ] && { echo "$INPUT file not found"; exit 99; }
while read colA colB colC colD colE colF colG colH colI colJ colK colL colM colN colO colP colQ colR colS colT colU colV colW colX colY colZ colAA colAB
do
   GEO=${colAB/[/\"lat\":}
   GEO=${GEO/]/}
   GEO=${GEO/,/\, \"lon\":}
   curl -XPOST 'http://localhost:9200/hack2012/place' -d '{ 
      "name":"'$colB'", 
      "type":"Hotel",
      "adress":"'$colC'", 
      "cp":"'$colE'", 
      "city":"'$colF'", 
      "mail":"'$colI'", 
      "site":"'$colJ'",
      "tel":"'$colG'", 
      "theme":"Tourisme", 
      "gestionnaire" : "Loire Atlantique", 
      "description" : "'$colL'",
      "pin":{'$GEO'}
   }'
   echo ""
done < $INPUT
IFS=$OLDIFS

echo "*************************************************************************************"
echo "Importing Equipement public mobilite"
echo "*************************************************************************************"
INPUT=equipement_public_transport.csv
OLDIFS=$IFS
IFS=';'
[ ! -f $INPUT ] && { echo "$INPUT file not found"; exit 99; }
while read colA colB colC colD colE colF colG colH colI colJ colK colL colM colN colO colP
do
   curl -XPOST 'http://localhost:9200/hack2012/place' -d '{ 
      "name":"'$colB'", 
      "type":"'$colH'",
      "adress":"'$colK'", 
      "cp":"'$colN'", 
      "city":"'$colJ'", 
      "site":"'$colM'",
      "tel":"'$colL'", 
      "theme":"Transport", 
      "gestionnaire" : "Nantes Métropole", 
      "pin":{"lat":'${colP/,/.}',"lon":'${colO/,/.}'}
   }'
   echo ""
done < $INPUT
IFS=$OLDIFS
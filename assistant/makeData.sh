#/usr/bin/bash

cp ./practiceType.txt ./data/practiceType.txt
awk -f practiceMath.awk practiceType.txt > ./data/practiceMath.txt
awk -f mathAnswer.awk mathAnswer.txt > ./data/mathAnswer.txt

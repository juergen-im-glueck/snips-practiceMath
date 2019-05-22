BEGIN {
  FS=",( )?"
}

{
  for (i = 1; i <= NF; i++) {
    while (getline l < "practiceMath.txt") {
      str = l
      sub(/\(practiceType\)/, "[" $i "](practiceType)", str)
      print str
    }
    close("practiceMath.txt")
  }
}
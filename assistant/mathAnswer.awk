{
  for (res = 1; res <= 100; res++) {
    str = $0
    sub(/\(result\)/, "[" res "](result)", str)
    print str
  }
}

END {
  split(" , ist gleich , gleich , ergibt ", verbs, ",")

  // multiplikation
  for (s in verbs) {
    for (a = 1; a <= 10; a++) {
      for (b = 1; b <= 10; b++) {
        print a " mal " b  verbs[s] "[" a * b "](result)"
      }
    }
  }

  // division
  for (s in verbs) {
    for (a = 1; a <= 10; a++) {
      for (b = 1; b <= 10; b++) {
        print a * b " geteilt durch " b  verbs[s] "[" a "](result)"
      }
    }
  }

  // addition
  for (s in verbs) {
    for (a = 1; a <= 10; a++) {
      for (b = 1; b <= 10; b++) {
        print a " plus " b  verbs[s] "[" a + b "](result)"
      }
    }
  }

  // subtraktion
  for (s in verbs) {
    for (a = 2; a <= 10; a++) {
      for (b = 1; b < a; b++) {
        print a " minus " b  verbs[s] "[" a - b "](result)"
      }
    }
  }

  // verdoppeln
  for (a = 1; a <= 10; a++) {
    print "Die Verdopplung von " a " ist [" a * 2 "](result)"
    print "Das Doppelte von " a " ist [" a * 2 "](result)"
  }

  // halbieren
  for (a = 1; a <= 10; a++) {
    print "Die Hälfte von " a * 2 " ist [" a "](result)"
    print "Die Halbierung von " a * 2 " ist [" a "](result)"
  }

  // verliebte Zahlen
  for (a = 1; a < 10; a++) {
    print "Die verliebte Zahl von " a " ist [" 10 - a "](result)"
  }
}
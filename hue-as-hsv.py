#!/usr/bin/env python2
from sys import argv

thing = argv[1]

def print_hsb(h,s,v):
    print "({},{},{})".format(h,s,v)

if __name__ == '__main__':
    print "CONVERTING {} to HSV. IM ASS.U.MING it looks like (int,int,int).".format(thing)

    vals = thing[1:-1]

    vals = thing[1:-1].split(",")
    r = float(vals[0])/255.0
    g = float(vals[1])/255.0
    b = float(vals[2])/255.0
    cmax = max([r,g,b])
    cmin = min([r,g,b])
    triangle = cmax - cmin

    V = cmax

    S = 0
    if cmax != 0:
        S = triangle / cmax
    else:
        print_hsb(-1, 0, V)

    if r == cmax:
        H = ( g - b ) / triangle
    elif g == cmax:
        H = 2 + ( b - r ) / triangle
    else:
        H = 4 + ( r - g ) / triangle

    H *= 60

    if H < 0:
        H += 360

    print_hsb(H,S,V)

#!/usr/bin/env python2
from sys import argv
import socket, zlib


THE_PROTOCOL_PORT = 65302
THE_IP_ADDY = "0.0.0.0"
udp_sock = None

def main(to_serve):
    try:
        to_serve_file = open(to_serve)
    except:
        return

    udp_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    udp_sock.bind((THE_IP_ADDY, THE_PROTOCOL_PORT))
    print "Listening on {}".format(THE_IP_ADDY)

    while True:
        gzip_encoded_hi = zlib.compress("HI")
        data, addr = udp_sock.recvfrom(len(gzip_encoded_hi))
        if data != gzip_encoded_hi:
            print "Some Hooligan isn't following the protocol."
            continue

        print "GOT HI!"
        udp_sock.sendto(gzip_encoded_hi, addr)

if __name__ == '__main__':
    to_serve = argv[1]
    main(to_serve)

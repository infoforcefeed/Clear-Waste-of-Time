#!/usr/bin/env python2
from server import THE_PROTOCOL_PORT
from sys import argv
import socket, zlib

def main(ip_address, ssn):
    udp_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    # Send HI first
    gzip_encoded_hi = zlib.compress("HI")
    import ipdb; ipdb.set_trace()
    udp_sock.sendto(gzip_encoded_hi, (ip_address, THE_PROTOCOL_PORT))

    # Get HI back
    data, addr = udp_sock.recvfrom(len(gzip_encoded_hi))
    if data != gzip_encoded_hi:
        print "Didn't get proper HI back."

if __name__ == '__main__':
    ip_address = argv[1]
    ssn = argv[2]
    if not ssn or not ip_address:
        print "Usage: {} <ip_address> <your social security number>".format(argv[0])
    else:
        main(ip_address, ssn)

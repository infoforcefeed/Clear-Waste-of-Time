#!/usr/bin/env python2
from server import THE_PROTOCOL_PORT
from sys import argv
import socket, zlib, select, termios, fcntl, array

def main(ip_address, ssn):
    udp_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    # Send HI first
    gzip_encoded_hi = zlib.compress("HI")
    udp_sock.sendto(gzip_encoded_hi, (ip_address, THE_PROTOCOL_PORT))

    # Get HI back
    data, addr = udp_sock.recvfrom(len(gzip_encoded_hi))
    if data != gzip_encoded_hi:
        print "Didn't get proper HI back."

    gzip_encoded_ssn = zlib.compress(ssn)
    print "Len: {}".format(len(gzip_encoded_ssn))

    print "Sending {}".format(gzip_encoded_ssn)
    udp_sock.sendto(gzip_encoded_ssn, (ip_address, THE_PROTOCOL_PORT))

    # Now we receieve the file
    readable, _, _ = select.select([udp_sock], [], [], 5000)
    buf = array.array('i', [0]) # The fuck does this work?
    fcntl.ioctl(readable[0].fileno(), termios.FIONREAD, buf, True)

    if buf <= 0:
        print "Nothing on the other side."
        return

    gzip_encoded_file = udp_sock.recvfrom(buf[0])
    print "FILE IS: {}".format(gzip_encoded_file)

if __name__ == '__main__':
    ip_address = argv[1]
    ssn = argv[2]
    if not ssn or not ip_address:
        print "Usage: {} <ip_address> <your social security number>".format(argv[0])
    else:
        main(ip_address, ssn)

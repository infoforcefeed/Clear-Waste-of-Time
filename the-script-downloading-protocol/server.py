#!/usr/bin/env python2
from sys import argv
import socket, zlib, select, termios, fcntl, array, mmap


THE_PROTOCOL_PORT = 65302
THE_IP_ADDY = "0.0.0.0"
udp_sock = None

def main(to_serve):
    try:
        to_serve_file = open(to_serve)
    except:
        return
    mmapd_file = mmap.mmap(to_serve_file.fileno(), 0, prot = mmap.PROT_READ)
    to_serve_file.close()

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

        print "Reading from socket bytes."
        readable, _, _ = select.select([udp_sock], [], [], 5000)
        buf = array.array('i', [0]) # The fuck does this work?
        fcntl.ioctl(readable[0].fileno(), termios.FIONREAD, buf, True)

        if buf <= 0:
            print "Nothing on the other side."
            continue

        gzip_encoded_ssn, addr = udp_sock.recvfrom(buf[0])
        # TODO: FUCK VALIDATION ASSUME CORRECT
        print "SSN IS {}".format(zlib.decompress(gzip_encoded_ssn))

        print "Sending file!"
        compressed_file = zlib.compress(mmapd_file.read(mmapd_file.size()))
        udp_sock.sendto(compressed_file, addr)
        mmapd_file.seek(0)

if __name__ == '__main__':
    to_serve = argv[1]
    ssn = argv[2]
    if not ssn or not to_serve:
        print "Usage: {} <file_to_serve> <your social security number>".format(argv[0])
    main(to_serve)

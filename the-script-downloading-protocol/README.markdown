## What is this?

What, you can't tell? It's an implementation of the `script-downloading`
protocol, intended to replace HTTP and `curl2sudo`. There was a timelimit on the
implementation of 45 minutes so this isn't quite done. It doesn't do SSN
validation, and the server doesn't send it's own SSN (lame!) but it does send
files over UDP.

## Usage

Server:

```Python
    print "Usage: {} <file_to_serve> <your social security number>".format(argv[0])
```

Client:

```Python
    print "Usage: {} <ip_address> <your social security number>".format(argv[0])
```

## Protocol Explanation

S denotes server, C denotes client:

```
    C: HI
    S: HI
    C: <client's social security number>
    S: <file>
    S: <server's social security number>
```

Caveats: This is all over UDP, and in addition all communication is `gzip`'d. Go
team!

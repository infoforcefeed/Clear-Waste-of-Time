#!/usr/bin/env python2
from PIL import Image, ImageDraw, ImageFont

WIDTH = 7200 #1080P

CONSTANT = 16
def main():
    height = CONSTANT
    words = open("eat_shit.txt")

    for line in words:
        height += CONSTANT

    image = Image.new('RGB', (WIDTH, height), (255,255,255))
    draw = ImageDraw.Draw(image)
    font = ImageFont.truetype("./LiberationMono-Regular.ttf",14)

    current_word_height = 0
    words.seek(0)
    for line in words:
        draw.text((0, current_word_height),
                line, (0,0,0), font)
        current_word_height += CONSTANT

    words.close()
    image.save("walloftext.jpg")

if __name__ == '__main__':
    main()

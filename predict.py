import os
import glob
import sys
import json

import numpy as np
import torch
from asl.model import Net, loadImg


def main():
    labelMap = ['T', 'F', 'X', 'C', 'space', 'delete', 'R', 'E', 'K', 'O', 'W', 'P', 'J',
                'U', 'L', 'nothing', 'A', 'S', 'B', 'Z', 'I', 'M', 'G', 'H', 'V', 'N', 'Y', 'D', 'Q']

    net = torch.load('./asl/asl_predict.pth', map_location='cpu')

    imagepath = os.path.join('./inputs', os.listdir('./inputs')[0])
    testImage = loadImg(imagepath)

    output = net.forward(testImage)[0]
    value, index = torch.max(output, 0)
    predLabel = str(labelMap[index])
    # print(value, index)

    os.remove(imagepath)

    return predLabel


if __name__ == '__main__':
    sys.stdout.write(main())
    sys.stdout.flush()
    # print(main())

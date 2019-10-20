import torch
import torch.nn as nn
import torch.nn.functional as F
import cv2

class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.conv1 = nn.Conv2d(1, 10, 3)   # 1 input image channel, 10 output channels, 3x3 square convolution kernel
        self.conv2 = nn.Conv2d(10, 20, 3)  # 10 channels from the conv1 layer, 20 output channels, 3x3 square convolution kernel
        self.conv3 = nn.Conv2d(20,10,3)
        self.conv4 = nn.Conv2d(10,5,3)
        self.fc1 = nn.Linear(5 * 9 * 9, 120)  # 9*9 from image dimension
        self.fc2 = nn.Linear(120, 84)
        self.fc3 = nn.Linear(84, 29)

    def forward(self, x):
        x = F.relu(self.conv1(x)) # 1) take x and apply convolution conv1; 2) apply nonlinearity F.relu; 3) apply max pool 2d
        x = F.max_pool2d(F.relu(self.conv2(x)), 2)
        x = F.relu(self.conv3(x))
        x = F.max_pool2d(F.relu(self.conv4(x)), 2) # 1) take x and apply convolution conv2; 2) apply nonlinearity F.relu; 3) apply max pool 2d
        x = x.view(-1, self.num_flat_features(x))  # reshape from matrix to vector for fully connected layer
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x

    def num_flat_features(self, x):
        size = x.size()[1:]  # all dimensions except the batch dimension
        num_features = 1
        for s in size:
            num_features *= s
        return num_features

def loadImg(path):
  image = cv2.imread(path)
  image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
  image = cv2.resize(image, (48, 48))
  image = image.reshape((1, 1, 48, 48))
  return torch.FloatTensor(torch.from_numpy(image).float())
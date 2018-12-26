import sys
import json

def main():
  rawData = sys.argv[1]

  cleanedData = rawData.replace(' ', '').replace(':', '').split(',')
  cleanedData = dict(zip(cleanedData[::2], cleanedData[1::2]))

  return json.dumps(cleanedData)

if __name__ == '__main__':
    sys.stdout.write(main())
    sys.stdout.flush()
    # print(main())

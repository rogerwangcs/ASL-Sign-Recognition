import sys
import json

def main():
  # print("This is the name of the script: ", sys.argv[0])
  # print("Number of arguments: ", len(sys.argv))
  # print("The arguments are: ", str(sys.argv))

  rawData = sys.argv[1]
  testData = "Residential Plan:\
              ,35.27\
              ,\
                Residential Dining Bucks:\
              ,371.26\
              ,\
                Student Optional Dining Bucks:\
              ,0.00\
              ,\
                Flex Dining Plan:\
              ,0.00\
              ,\
                Flex Dining Bonus Plan:\
              ,0.00\
              ,\
                Student Eagle Bucks:\
              ,17.50\
              ,\
                Print Allotment:\
              ,0\
              "

  cleanedData = testData.replace(' ', '').replace(':', '').split(',')
  cleanedData = dict(zip(cleanedData[::2], cleanedData[1::2]))

  return json.dumps(cleanedData)

if __name__ == '__main__':
    sys.stdout.write(main())
    sys.stdout.flush()
    # print(main())

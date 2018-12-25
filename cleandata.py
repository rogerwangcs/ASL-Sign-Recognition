import sys

def main():
  print("This is the name of the script: ", sys.argv[0])
  print("Number of arguments: ", len(sys.argv))
  print("The arguments are: ", str(sys.argv))

  data = sys.argv[1]

  return data

if __name__ == '__main__':
    sys.stdout.write(main())
    sys.stdout.flush()

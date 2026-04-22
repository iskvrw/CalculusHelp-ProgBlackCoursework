import sys
import json

email = sys.argv[1]
password = sys.argv[2]
username = sys.argv[3]
first_name = sys.argv[4]

successful = False
reason = ""

with open('data.json', 'r') as file:
    data = json.load(file)
    if email in data:
        reason = "Account with this email already exists."
        file.close()
    else:
        file.close()
        with open('data.json', 'w') as file:
            data[email] = {"password":password, "username":username, "first_name":first_name}
            json.dump(data, file, indent=4)
            successful = True
            file.close()


return_data = [successful, reason]
print(return_data)
sys.stdout.flush()

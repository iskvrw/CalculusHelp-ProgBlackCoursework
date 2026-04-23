import sys, json

credentials = sys.argv[1].split(',')
email = credentials[0]
password = credentials[1]
username = credentials[2]
first_name = credentials[3]

successful = False
reason = ""

with open('data.json', 'r') as file:
    data = json.load(file)
    if email in data:
        reason = "Account with this email already exists."
    else:
        with open('data.json', 'w') as file:
            data[email] = {"password":password, "username":username, "first_name":first_name}
            json.dump(data, file, indent=4)
            successful = True

return_data = [successful, reason]

print(return_data)
sys.stdout.flush()
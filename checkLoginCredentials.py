import sys, json

credentials = sys.argv[1].split(',')
email = credentials[0]
password = credentials[1]

successful = False
reason = ""

with open('data.json', 'r') as file:
    data = json.load(file)
    if email in data:
        if data[email]["password"] == password:
            successful = True
            user_info = {"email":email, "username":data[email]["username"], "first_name":data[email]["first_name"]}
        else:
            reason = "Incorrect password"
    else:
        reason = "There doesn't exist an account with this email."

return_data = [successful, reason, user_info]
print(return_data)
sys.stdout.flush()
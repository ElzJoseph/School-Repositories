import os
import json
from getpass import getpass

from settings import Settings
from user import User
from library import Library

class SteamLibrary:

	def __init__(self):
		self.settings = Settings()
		

	def load_data(self):
		try:
			with open(self.settings.game_location, 'r') as file:
				self.settings.library = json.load(file)
		except:
			self.settings.game_location = {}

		try:
			with open(self.settings.users_location, 'r') as file:
				self.settings.users = json.load(file)
		except:
			self.settings.users = {}
		

	def clear_screen(self):
		if os.name == "nt":
			os.system("cls")
		else:
			os.system("clear")

	def logger(self):
		self.clear_screen()
		self.login_attemps = 0
		while self.login_attemps < 3:
			print("\nLog in to your account")
			username = input("Username: ")
			password = getpass("Password: ")


			if username in self.settings.users:
				if self.settings.users[username]["password"] == password:
					self.user = User(username, email=self.settings.users[username]['Email'],
						password="")
				
					print(f"Welcome back {username}")
					Welcome = input()
					return True
			else:
				print("Login Failed")
			self.login_attemps += 1

		return False

	def show_menus(self):
		self.clear_screen()
		print(self.settings.menu)
	
	def find_game(self, game):
		library = self.settings.library
		if game in library:
			print(f"Name: {library[game]['Name']}")
			print(f"Developer: {library[game]['Developer']} ")
			print(f"Genre: {library[game]['Genre']}")
			print(f"Launch date: {library[game]['Launch']}")
			return True
		else:
			print("You do not own that game")

	def save_data(self):
		with open(self.settings.game_location, 'w') as file:
			json.dump(self.settings.library, file)



	def check_option_user(self, char):
		if char == 'q':
			self.settings.active = False
		elif char == "1":

			self.clear_screen()
			library = self.settings.library

			print(f"Name\t\t\tDeveloper\t\tGenre\t\tLaunch")

			for game, gameItem in library.items():
				print(f"{game}\t\t{gameItem['Developer']}\t\t\t{gameItem['Genre']}\t{gameItem['Launch']}")
			
			input("Press Enter to Return. ")

		elif char == "2":
			

			self.clear_screen()
			game = input("Game: ")

			self.find_game(game)


			input("Press Enter to Return")

		elif char == "3":
			name = input("Name: ")
			developer = input("Developer: ")
			genre = input("Genre: ")
			launch = input("Launch: ")
			new_library = Library(name, developer, genre, launch)

			self.settings.library[new_library.name]= {
				"Name" : new_library.name,
				"Developer" : new_library.developer,
				"Genre" : new_library.genre,
				"Launch" : new_library.launch
			}

			self.save_data()

			print("Game saved.")
			input("Press Enter to return")

		

		elif char == "4":
			self.clear_screen()
			game = input("Game: ")

			if self.find_game(game):
				confirm = input("Are you sure you want to delete this game? (y/n)")
				if confirm.lower() == "y":
					del self.settings.library[game]

					self.save_data()

					print("Game has been deleted")		


			input("Press Enter to return")


	def run(self):
		self.load_data()
		self.settings.active = self.logger()

		while self.settings.active:
			self.show_menus()
			self.check_option_user(input("Option: ").lower())
			

if __name__ == '__main__':
	app = SteamLibrary()
	app.run()
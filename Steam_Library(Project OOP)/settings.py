
class Settings:

	def __init__(self):
		self.active = False
		self.game_location = "data/Library.json"
		self.users_location = "data/users.json"

		self.library = None
		self.users = None

		self.menu = """
														Steam Library

													Houses all your games




1. View info on available games 		2. Find games			3. Add new game to library 			4. Remove game from library 		Q. Exit Steam library
"""
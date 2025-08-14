# scripts/text.py
import sys
import random

# Ensure UTF-8 encoding for Windows
sys.stdout.reconfigure(encoding='utf-8')

# Function-wise random generators
def generate_random_int(start=1, end=100):
    return random.randint(start, end)

def generate_random_float():
    return random.random()

def choose_random_item(choices=None):
    if choices is None:
        choices = ["Apple", "Banana", "Cherry", "Date"]
    return random.choice(choices)

# Main execution
if __name__ == "__main__":
    print("✅ Python script is running successfully!\n")

    rand_int = generate_random_int()
    print(f"Random Integer (1-100): {rand_int}")

    rand_float = generate_random_float()
    print(f"Random Float (0-1): {rand_float:.4f}")

    rand_choice = choose_random_item()
    print(f"Random Choice from list: {rand_choice}")

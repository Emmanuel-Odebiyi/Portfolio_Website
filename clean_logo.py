import re

def clean_svg(path):
    with open(path, 'r') as f:
        data = f.read()
    
    # Remove defs and filters
    data = re.sub('<defs>.*?</defs>', '', data, flags=re.DOTALL)
    # Remove mask usage
    data = data.replace(' mask="url(#2904dee246)"', '')
    
    with open(path, 'w') as f:
        f.write(data)

clean_svg('public/logo.svg')
clean_svg('src/assets/logo.svg')

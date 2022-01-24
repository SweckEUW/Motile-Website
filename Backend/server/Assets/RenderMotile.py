from ast import For
from tokenize import String
import bpy,sys,json

argv = sys.argv
argv = argv[argv.index("--") + 1:]
settings = json.loads(argv[0])

phone = bpy.data.objects['Phone']

for component in settings["components"]:
    if "position" in component and component["position"]:
        componentNode = bpy.data.objects[component["name"]]
        componentNode.location = (component["position"]["_x"] / 1000, component["position"]["_z"]  / 1000, component["position"]["_y"]  / 1000)

# Change Rendering filepath
bpy.context.scene.render.filepath = settings["exportPath"]

print("Starting Rendering!")
bpy.ops.render.render(write_still=True)
print("Rendering Done!")

print("Quit")

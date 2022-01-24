from tokenize import String
import bpy,sys,json

argv = sys.argv
argv = argv[argv.index("--") + 1:]
settings = json.loads(argv[0])

phone = bpy.data.objects['Phone']
print(settings["components"])

# Change Rendering filepath
bpy.context.scene.render.filepath = settings["exportPath"]

print("Starting Rendering!")
bpy.ops.render.render(write_still=True)
print("Rendering Done!")

print("Quit")

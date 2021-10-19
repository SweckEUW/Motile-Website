import bpy,sys

argv = sys.argv
argv = argv[argv.index("--") + 1:]

bpy.data.objects['Phone'].location = (float(argv[1]),float(argv[2]),float(argv[3]))

# Change Rendering filepath
bpy.context.scene.render.filepath = argv[0]

print("Starting Rendering!")
bpy.ops.render.render(write_still=True)
print("Rendering Done!")

print("Quit")

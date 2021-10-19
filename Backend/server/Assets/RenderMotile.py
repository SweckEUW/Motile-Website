import bpy,sys

argv = sys.argv
argv = argv[argv.index("--") + 1:]
print(bpy.data.objects['Phone-complete'].location)
bpy.data.objects['Phone-complete'].location = (float(argv[0]),float(argv[1]),float(argv[2]))
# bpy.data.objects['Phone-complete'].rotation_euler = (float(argv[0]),float(argv[1]),float(argv[2]))
print(bpy.data.objects['Phone-complete'].location)
# Change Rendering filepath
# bpy.context.scene.render.filepath = ""

print("Starting Rendering!")
bpy.ops.render.render(write_still=True)
print("Rendering Done!")

print("Quit")

import bpy,sys

argv = sys.argv
argv = argv[argv.index("--") + 1:]

phone = bpy.data.objects['Phone']
phone.location = (phone.location.x + float(argv[1]), phone.location.y +float(argv[2]), phone.location.z +float(argv[3]))
phone.rotation_euler = (phone.rotation_euler.x + float(argv[4]), phone.rotation_euler.y + float(argv[5]), phone.rotation_euler.z + float(argv[6]))

# Change Rendering filepath
bpy.context.scene.render.filepath = argv[0]

print("Starting Rendering!")
bpy.ops.render.render(write_still=True)
print("Rendering Done!")

print("Quit")

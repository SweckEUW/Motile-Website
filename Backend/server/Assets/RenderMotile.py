import bpy,sys,json

argv = sys.argv
argv = argv[argv.index("--") + 1:]
settings = json.loads(argv[0])

def changeColor(mesh,color):
    def recurse(mesh,color):
        if mesh.active_material:
            material = mesh.active_material
            if "Principled BSDF" in material.node_tree.nodes:
                principled = material.node_tree.nodes["Principled BSDF"]
                principled.inputs["Base Color"].default_value = tuple(int(color[i:i + 2], 16) / 255. for i in (1, 3, 5)) + (1,)
        for child in mesh.children:
            recurse(child,color)
    recurse(mesh,color)

for component in settings["components"]:
    if "position" in component and component["position"]:
        componentNode = bpy.data.objects[component["name"]]
        componentNode.location = (component["position"]["_x"] / 1000, component["position"]["_z"]  / 1000, component["position"]["_y"]  / 1000)
        if component["name"] is not "KleinerRückdisplay" and component["name"] is not "GroßerRückdisplay":
            changeColor(componentNode,component["color"])

if settings["isTablet"]:
    bpy.data.objects['Tablet'].location = (0, 0, 0)
    bpy.data.objects['Camera'].location = (0, 0, 0.4)
else:
    bpy.data.objects['Phone'].location = (0, 0, 0)

# Change Rendering filepath
bpy.context.scene.render.filepath = settings["exportPath"]

print("Starting Rendering!")
bpy.ops.render.render(write_still=True)
print("Rendering Done!")

print("Quit")

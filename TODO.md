# To-do list


## Goal
Every resources have a container nearby, they are assigned once the spawn of a harvester that goes to mine this resource
on top of the container and drop the resource in it (No work parts needed).
The carriers are also assigned to containers and goes to it to pickup their content to spread it.
In case carries works with remotes rooms, they have carry parts to repair the roads on which they walk.

Builders, take resources from carriers or storages and goes to build fastly construction sites.
They can also repair, in case they have nothing to work on or spread the resources from containers to extensions.

### Additional infos
Harvesters has a variable target in the memory which refer to the source they are attached.
Once they go to the source, they search up for a container nearby so they can drop in it (going on top of it).

Number of harvesters per room = Number of containers nearby sources in rooms

## Plan

### Roles
- Each roles has body parts.
- Each roles has tasks and derived tasks.
Derived tasks: When an error occurs on the precedent task, the creep will try to do the derived if it exists.
- Name creeps with random names/numbers.

### Population
- All room has configurations, based on math formula.
- Calculate the rooms configurations every X ticks (Save some CPU, since it's expensive calls).
- Verify if the current creep population is lower than the already calculated configuration.

### Energy active
- Is considered active when a storage / container is in range of 2.
- Each storage / container are slots for harvesters.

### Harvesters and carriers
- Population needed depends of the amount of energy active.
- Harvesters are assigned to one source active.
- One harvester is always needed per room.
- Spawn the first harvester with one carry parts, so he make his own resource active.

- Carriers: Go to the most filled / resource assigned ???

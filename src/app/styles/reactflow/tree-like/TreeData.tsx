"use client";

import { Controls, ReactFlow } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const roles = [
	{
		id: "confidential-lead",
		name: "Confidential Lead",
		superRoleId: null,
		createdAt: "2025-02-28T02:44:00.347Z",
		updatedAt: "2025-02-28T02:44:00.347Z",
		superRole: null,
	},
	{
		id: "confidential",
		name: "Confidential",
		superRoleId: "confidential-lead",
		createdAt: "2025-02-28T02:44:00.347Z",
		updatedAt: "2025-02-28T02:44:00.347Z",
		superRole: {
			id: "confidential-lead",
			name: "Confidential Lead",
			superRoleId: null,
			createdAt: "2025-02-28T02:44:00.347Z",
			updatedAt: "2025-03-25T13:11:20.437Z",
		},
	},
	{
		id: "default",
		name: "Default",
		superRoleId: "admin",
		createdAt: "2025-02-28T02:44:00.347Z",
		updatedAt: "2025-02-28T02:44:00.347Z",
		superRole: {
			id: "admin",
			name: "Admin",
			superRoleId: null,
			createdAt: "2025-02-28T02:44:00.347Z",
			updatedAt: "2025-03-25T13:11:20.437Z",
		},
	},
	{
		id: "technical-support-lead",
		name: "Technical Support Lead",
		superRoleId: "admin",
		createdAt: "2025-03-24T11:39:46.262Z",
		updatedAt: "2025-03-24T11:42:32.746Z",
		superRole: {
			id: "admin",
			name: "Admin",
			superRoleId: null,
			createdAt: "2025-02-28T02:44:00.347Z",
			updatedAt: "2025-03-25T13:11:20.437Z",
		},
	},
	{
		id: "technical-support",
		name: "Technical Support",
		superRoleId: "technical-support-lead",
		createdAt: "2025-03-24T11:40:30.112Z",
		updatedAt: "2025-03-24T11:42:39.678Z",
		superRole: {
			id: "technical-support-lead",
			name: "Technical Support Lead",
			superRoleId: "admin",
			createdAt: "2025-03-24T11:39:46.262Z",
			updatedAt: "2025-03-24T11:42:32.746Z",
		},
	},
	{
		id: "admin",
		name: "Admin",
		superRoleId: null,
		createdAt: "2025-02-28T02:44:00.347Z",
		updatedAt: "2025-03-25T13:11:20.437Z",
		superRole: null,
	},
];

type RoleNode = {
	id: string;
	position: { x: number; y: number };
	data: {
		label: string;
	};
	style: { width: number; height: number };
};

/**
 * set id, position and data,
 * position generated from left to right hierarchically,
 * root roles are placed on the leftmost column,
 * roles with the same superRole should be placed in the same column
 */
const nodeSize = { width: 200, height: 60 };
const gap = { x: 300, y: 200 };
const roleNodes: RoleNode[] = [];

// Helper function to recursively calculate positions
const calculateNodePosition = (
	role: (typeof roles)[0],
	x: number,
	y: number,
	columnMap: Map<string, number>
) => {
	// Check if the node is already placed
	if (roleNodes.find((n) => n.id === role.id)) return;

	// Add the current node
	roleNodes.push({
		id: role.id,
		position: { x, y },
		data: {
			label: role.name,
		},
		style: {
			width: nodeSize.width,
			height: nodeSize.height,
		},
	});

	// Find child roles
	const childRoles = roles.filter((r) => r.superRoleId === role.id);

	// Place child roles in the next row
	let childX = x;
	for (const child of childRoles) {
		childX += gap.x;
		calculateNodePosition(child, childX, y + gap.y, columnMap);
	}
};

// Start with root roles (superRoleId: null)
const rootRoles = roles.filter((r) => r.superRoleId === null);
let rootX = 0;
for (const rootRole of rootRoles) {
	calculateNodePosition(rootRole, rootX, 0, new Map());
	rootX += gap.x;
}

/* generate initial edges */
const initialEdges = roles
	.filter((r) => r.superRoleId)
	.map((r) => ({
		id: `${r.id}-${r.superRoleId}`,
		source: r.superRoleId as string,
		target: r.id,
		label: r.name,
	}));

const TreeData = () => {
	return (
		<div
			id="treeWrapper"
			className="w-[60vw] h-[40vh] m-4
			border border-dashed border-gray-300"
		>
			<ReactFlow
				nodes={roleNodes}
				edges={initialEdges}
				colorMode={"dark"}
			>
				<Controls />
			</ReactFlow>
		</div>
	);
};

export default TreeData;

// src/components/admin/UserRow.tsx
import React, { useState } from "react";
import type { User, Role } from "../../types";
import {
  useBlockUserMutation,
  useUpdateUserMutation,
} from "../../api/usersApi";
import { toast } from "react-toastify";

/** small helper to safely extract messages from unknown errors */
function extractErrorMessage(err: unknown): string {
  if (!err) return "Unknown error";
  if (typeof err === "string") return err;
  if (typeof err === "object" && err !== null) {
    const obj = err as Record<string, unknown>;
    const data = obj["data"];
    if (typeof data === "object" && data !== null) {
      const msg = (data as Record<string, unknown>)["message"];
      if (typeof msg === "string" && msg.trim()) return msg;
    }
    const message = obj["message"];
    if (typeof message === "string" && message.trim()) return message;
  }
  return "Action failed";
}

type Props = {
  user: User;
  onUpdated?: () => void;
};

export const UserRow: React.FC<Props> = ({ user, onUpdated }) => {
  const [blockUser] = useBlockUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [loading, setLoading] = useState(false);

  const toggleBlock = async () => {
    const action = user.isBlocked ? "Unblock" : "Block";
    if (!confirm(`${action} user ${user.name}?`)) return;

    setLoading(true);
    try {
      // backend expects { id, block: boolean } per your earlier code
      await blockUser({ id: user._id, block: !user.isBlocked }).unwrap();
      toast.success(`${action}ed ${user.name}`);
      onUpdated?.();
    } catch (err: unknown) {
      toast.error(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const changeRole = async (role: Role) => {
    if (role === user.role) return;
    setLoading(true);
    try {
      await updateUser({ id: user._id, body: { role } }).unwrap();
      toast.success(`Role updated to ${role}`);
      onUpdated?.();
    } catch (err: unknown) {
      toast.error(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="border-b">
      <td className="px-3 py-2 text-sm">{user._id}</td>
      <td className="px-3 py-2 text-sm">{user.name}</td>
      <td className="px-3 py-2 text-sm">{user.email}</td>
      <td className="px-3 py-2 text-sm">{user.role}</td>
      <td className="px-3 py-2 text-sm">
        {user.isBlocked ? "Blocked" : "Active"}
      </td>
      <td className="px-3 py-2 text-sm">
        <div className="flex gap-2 items-center">
          <select
            value={user.role}
            onChange={(e) => changeRole(e.target.value as Role)}
            disabled={loading}
            className="input text-sm"
          >
            <option value="sender">Sender</option>
            <option value="receiver">Receiver</option>
            <option value="admin">Admin</option>
          </select>

          <button
            onClick={toggleBlock}
            disabled={loading}
            className="btn-outline px-3 py-1 text-sm"
            aria-pressed={user.isBlocked}
          >
            {user.isBlocked ? "Unblock" : "Block"}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;

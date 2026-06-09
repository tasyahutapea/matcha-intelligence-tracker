'use client'

import { useEffect, useState, FormEvent } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

type MatchaEntry = {
  id: number
  name: string
  rating: number
  notes: string
}

export default function Home() {
  const [matcha, setMatcha] = useState<MatchaEntry[]>([])
  const [name, setName] = useState('')
  const [rating, setRating] = useState(1)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  async function fetchData() {
    try {
      setLoading(true)

      const res = await fetch('/api/matcha')
      const data: MatchaEntry[] = await res.json()

      setMatcha(data)
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!name.trim() || rating < 1 || rating > 5) {
      alert('Input tidak valid')
      return
    }

    try {
      setSubmitting(true)

      await fetch('/api/matcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          rating,
          notes,
        }),
      })

      setName('')
      setRating(1)
      setNotes('')

      await fetchData()
    } catch (err) {
      console.error('Submit error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id: number) {
    try {
      await fetch('/api/matcha', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      await fetchData()
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  const avgRating =
    matcha.length > 0
      ? (
          matcha.reduce(
            (sum: number, m: MatchaEntry) => sum + m.rating,
            0
          ) / matcha.length
        ).toFixed(2)
      : '0'

  const topMatcha =
    matcha.length > 0
      ? matcha.reduce(
          (prev: MatchaEntry, current: MatchaEntry) =>
            prev.rating > current.rating ? prev : current
        )
      : null

  const chartData = matcha.map(
    (m: MatchaEntry, index: number) => ({
      entry: index + 1,
      rating: m.rating,
    })
  )

  return (
    <div className="min-h-screen bg-[#1F2A24] text-[#E6F2EA] p-6">
      <div className="max-w-xl mx-auto bg-[#2E3F35] shadow-xl rounded-2xl p-6 border border-[#3F5A4A] space-y-6">

        <div>
          <h1 className="text-2xl font-semibold">
            🍵 Matcha Intelligence Tracker
          </h1>
          <p className="text-sm text-[#A9C9A4]">
            Your personal matcha journey — track, reflect,
            and improve your taste.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="bg-[#3F5A4A] p-3 rounded-lg text-center">
            <p className="text-xs text-[#A9C9A4]">Average</p>
            <p className="font-semibold">⭐ {avgRating}</p>
          </div>

          <div className="bg-[#3F5A4A] p-3 rounded-lg text-center">
            <p className="text-xs text-[#A9C9A4]">Entries</p>
            <p className="font-semibold">
              📊 {matcha.length}
            </p>
          </div>

          <div className="bg-[#3F5A4A] p-3 rounded-lg text-center">
            <p className="text-xs text-[#A9C9A4]">Top</p>
            <p className="font-semibold">
              🥇 {topMatcha ? topMatcha.name : '-'}
            </p>
          </div>
        </div>

        {matcha.length > 1 && (
          <div>
            <p className="text-sm text-[#A9C9A4] mb-1">
              Rating Trend Over Time
            </p>

            <p className="text-xs text-[#7FA88C] mb-2">
              X: Entry order • Y: Rating (1–5)
            </p>

            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid
                  stroke="#3F5A4A"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="entry"
                  stroke="#A9C9A4"
                />

                <YAxis
                  domain={[1, 5]}
                  stroke="#A9C9A4"
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="#86A789"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3"
        >
          <input
            placeholder="Matcha name (e.g. Uji Ceremonial)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#1F2A24] border border-[#3F5A4A] p-2 rounded"
          />

          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) =>
              setRating(Number(e.target.value))
            }
            className="bg-[#1F2A24] border border-[#3F5A4A] p-2 rounded"
          />

          <p className="text-xs text-[#7FA88C]">
            1 = not enjoyable • 5 = exceptional
          </p>

          <textarea
            placeholder="Notes (taste, aroma, texture...)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="bg-[#1F2A24] border border-[#3F5A4A] p-2 rounded"
          />

          <button
            disabled={submitting}
            className="bg-[#86A789] hover:bg-[#6f8f75] transition text-white py-2 rounded"
          >
            {submitting
              ? 'Adding...'
              : 'Add Entry'}
          </button>
        </form>

        {loading ? (
          <p className="text-sm text-[#A9C9A4]">
            Loading...
          </p>
        ) : matcha.length === 0 ? (
          <p className="text-sm text-center text-[#7FA88C]">
            No matcha yet. Start your journey by adding
            your first one.
          </p>
        ) : (
          <ul>
            {matcha.map((m: MatchaEntry) => (
              <li
                key={m.id}
                className="border-b border-[#3F5A4A] py-3 flex justify-between"
              >
                <div>
                  <p className="font-medium">
                    {m.name}
                  </p>

                  <p className="text-yellow-300">
                    {'⭐'.repeat(m.rating)}
                  </p>

                  {m.notes && (
                    <p className="text-xs text-[#A9C9A4]">
                      {m.notes}
                    </p>
                  )}
                </div>

                <button
                  onClick={() =>
                    handleDelete(m.id)
                  }
                  className="text-red-400 text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
import type { Review } from "@/lib/types";
import { StarRating } from "./StarRating";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="card-frame relative flex h-full flex-col justify-between bg-ivory p-6">
      <span className="suit-pip">♦</span>
      <div>
        <StarRating rating={review.rating} />
        <p className="mt-4 text-sm leading-relaxed text-onyx/80">
          &ldquo;{review.body}&rdquo;
        </p>
      </div>
      <div className="mt-6 border-t border-gold/15 pt-3">
        <p className="font-display text-onyx">{review.author_name}</p>
        {review.barber_name && (
          <p className="text-xs uppercase tracking-wider text-gold">
            Client of {review.barber_name}
          </p>
        )}
      </div>
    </div>
  );
}

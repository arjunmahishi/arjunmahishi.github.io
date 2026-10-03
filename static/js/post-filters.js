(function () {
  var root = document.querySelector("[data-post-filters]");
  if (!root) return;

  var categoryButtons = Array.prototype.slice.call(root.querySelectorAll("[data-category-filter]"));
  var topicGroups = Array.prototype.slice.call(root.querySelectorAll("[data-topic-group]"));
  var postItems = Array.prototype.slice.call(document.querySelectorAll("[data-post-item]"));
  var status = root.querySelector("[data-filter-status]");
  var activeCategory = "all";
  var activeTopic = "all";

  function topicGroupFor(category) {
    return topicGroups.find(function (group) {
      return group.getAttribute("data-topic-group") === category;
    });
  }

  function topicExists(category, topic) {
    if (topic === "all") return true;
    var group = topicGroupFor(category);
    if (!group) return false;
    return Array.prototype.some.call(group.querySelectorAll("[data-topic-filter]"), function (button) {
      return button.getAttribute("data-topic-filter") === topic;
    });
  }

  function update() {
    if (!topicExists(activeCategory, activeTopic)) {
      activeTopic = "all";
    }

    categoryButtons.forEach(function (button) {
      var selected = button.getAttribute("data-category-filter") === activeCategory;
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    });

    topicGroups.forEach(function (group) {
      var selectedGroup = group.getAttribute("data-topic-group") === activeCategory;
      group.hidden = !selectedGroup;

      group.querySelectorAll("[data-topic-filter]").forEach(function (button) {
        var selected = selectedGroup && button.getAttribute("data-topic-filter") === activeTopic;
        button.setAttribute("aria-pressed", selected ? "true" : "false");
      });
    });

    var visibleCount = 0;
    postItems.forEach(function (item) {
      var categoryMatches = activeCategory === "all" || item.getAttribute("data-category") === activeCategory;
      var tags = item.getAttribute("data-tags").split(/\s+/);
      var topicMatches = activeTopic === "all" || tags.indexOf(activeTopic) !== -1;
      var visible = categoryMatches && topicMatches;

      item.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    status.textContent = "Showing " + visibleCount + " of " + postItems.length + " posts";
  }

  categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activeCategory = button.getAttribute("data-category-filter");
      update();
    });
  });

  topicGroups.forEach(function (group) {
    group.querySelectorAll("[data-topic-filter]").forEach(function (button) {
      button.addEventListener("click", function () {
        activeTopic = button.getAttribute("data-topic-filter");

        var categoryTarget = button.getAttribute("data-category-target");
        if (activeCategory === "all" && categoryTarget) {
          activeCategory = categoryTarget;
        }

        update();
      });
    });
  });

  root.hidden = false;
  update();
})();
